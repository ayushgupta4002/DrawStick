import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SECRET_TOKEN_FORAPIAUTH = process.env.NEXT_PUBLIC_SECRET_TOKEN_FORAPIAUTH;


const response = {
  role: 'assistant',
  content: '```mermaid\n' +
    'graph TD;\n' +
    '  A(Frontend)-->B(Component1);\n' +
    '  A-->C(Component2);\n' +
    '  B-->D(SubComponent1);\n' +
    '  C-->E(SubComponent2);\n' +
    '  D-->F(API1);\n' +
    '  E-->G(API2);\n' +
    '  F-->H(Database1);\n' +
    '  G-->I(Database2);\n' +
    '  H-->J(Cache1);\n' +
    '  I-->K(Cache2);\n' +
    '```\n' +
    '```mermaid\n' +
    'subgraph Backend\n' +
    '  B(Component1)-->D(SubComponent1);\n' +
    '  C(Component2)-->E(SubComponent2);\n' +
    '  D(SubComponent1)-->F(API1);\n' +
    '  E(SubComponent2)-->G(API2);\n' +
    '  F(API1)-->H(Database1);\n' +
    '  G(API2)-->I(Database2);\n' +
    '  H(Database1)-->J(Cache1);\n' +
    '  I(Database2)-->K(Cache2);\n' +
    'end\n' +
    '```\n' +
    '```mermaid\n' +
    'subgraph Routes\n' +
    '  H(Database1)-->L(Route1);\n' +
    '  I(Database2)-->M(Route2);\n' +
    '  J(Cache1)-->N(Route3);\n' +
    '  K(Cache2)-->O(Route4);\n' +
    'end\n' +
    '```\n' +
    '```mermaid\n' +
    'subgraph Frontend\n' +
    '  A(Frontend)-->P(Redux);\n' +
    '  P(Redux)-->Q(React);\n' +
    '  P(Redux)-->R(Saga);\n' +
    'end\n' +
    '```'
}
export async function GET() {
  function extractCode(response:any) {
    const startDelimiter = "```mermaid";
    const endDelimiter = "```";
    let startIndex = response.indexOf(startDelimiter);
    const codes = [];
  
    while (startIndex !== -1) {
      const endIndex = response.indexOf(
        endDelimiter,
        startIndex + startDelimiter.length
      );
      if (endIndex !== -1) {
        // Extract code and remove the first line
        let code = response.substring(startIndex, endIndex).trim();
        // Remove the first line
        code = code.substring(code.indexOf("\n") + 1);
        codes.push(code);
      }
      startIndex = response.indexOf(
        startDelimiter,
        endIndex + endDelimiter.length
      );
    }
  
    return codes;
  }
  

    
  const codes = extractCode(response.content);
  const final = codes.join('\n\n');
  console.log(final)
  return new Response(final);
}






export async function POST(req: Request, res: NextResponse) {

  const body = await req.json();
  const token = req.headers.get('authorization');

  console.log(body);
  console.log(token);

  if (token !== `Bearer ${SECRET_TOKEN_FORAPIAUTH}`) {
    // If the token doesn't match, return a 401 Unauthorized response
    return  NextResponse.json({message : "unauthorized"},{status:401});

  }

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: "assistant",
  //       content:
  //         `${body.prompt} Design a system design a very detailed system design diagram using this information in mermaid syntax consisting of many components , Make sure that code does not have multiple mermaid but can have multiple graphs , subgraphs etc ,just give the code in mermaid syntax to draw system design and nothing else  `
  //     },
  //   ],
  // });
  // console.log(completion.choices[0].message);
  // const theResponse = completion.choices[0].message;

  return  NextResponse.json({message : response},{status:200});
  
  
}
