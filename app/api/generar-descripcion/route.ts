// app/api/generar-descripcion/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Eres un redactor profesional de anuncios para animales en adopción o venta. Sé claro, responsable y evita exageraciones.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response:', data);

    const resultado = data.choices?.[0]?.message?.content || 'Error al generar descripción';
    return NextResponse.json({ resultado });

  } catch (error) {
    console.error('Error al llamar a OpenAI:', error);
    return NextResponse.json({ resultado: 'Error al generar descripción' });
  }
}
