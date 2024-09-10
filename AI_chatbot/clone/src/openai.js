import Together from "together-ai";


const together = new Together({ apiKey: '87ca3f68f48cada099ff1278e20f6ae02be7acab4b81b40dfb100bf006d7f7d1' });
export async function sendMsgToOpenAI(message){
    return 'We are excited to introduce ChatGPT to get users’ feedback and learn about its strengths and weaknesses. During the research preview, usage of ChatGPT is free. Try it now at chatgpt.com(opens in a new window).';
}


// const { Configuration, OpenAIApi } = require('openai');
// const configuration = new Configuration({ apikey: "sk-ok1Lfc5Lp8d4J12TpQCnT3B1bkFJcyloBRPEkFUuLv13acpw"}); 
// const openai = new OpenAIApi(configuration);

// export async function sendMsgToOpenAI (message) {
//     const res = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: message,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presense_penalty: 0
//     });
//     return res.data.choices[0].text;
// }