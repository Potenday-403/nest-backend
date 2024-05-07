import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI();
  }

  async getAnswer() {
    const response = await this.openAI.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: '친한 친구의 결혼식에서 해줄 수 있는 말을 한 가지 추천해줘',
        },
      ],
      model: 'gpt-3.5-turbo-1106',
    });

    console.log(response.choices[0].message.content);
  }
}
