import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI();
  }

  async getAnswer(props: { relationship: string | null; eventType: string }) {
    const { relationship, eventType } = props;

    // TODO: 프롬프트 고도화
    const content = relationship
      ? `${relationship}의 ${eventType}에서 해줄 수 있는 말을 한 가지 추천해줘`
      : `${eventType}에서 해줄 수 있는 말을 한 가지 추천해줘`;

    const response = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content,
        },
      ],
      model: 'gpt-3.5-turbo-1106',
    });

    return response.choices[0].message.content;
  }
}
