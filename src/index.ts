import axios, {AxiosResponse} from "axios";

const DOCUMENT_URL = "http://norvig.com/big.txt";
const API_KEY = "dummy_key"
const LOOK_UP_URL = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${API_KEY}&lang=en-ru&text=SEARCH_WORD`

type Translation = {
    text: string;
    pos: string;
    fr: number;
    mean: Array<{text: string;}>;
}
type DictionaryEntry={
    text: string;
    pos: string;
    ts: string;
    tr: Translation[]
}
type LookUpResponse = {
    head: any;
    def:DictionaryEntry[];
}
export const removeAllSpecialCharactersAndNumbers = (text:string):string=>{
    return text.replace(/[^a-zA-Z \n]/g, "");
}
export const getListOfAllWords = (text:string):string[]=>{
    return removeAllSpecialCharactersAndNumbers(text).toLowerCase().split(/\s+/)
}

export const computeWordFrequency= (text:string):{[k:string]:number}=>{
    if(text.length===0){
        return {};
    }
    const wordFrequency:{[k:string]:number}={}
    getListOfAllWords(text).forEach((word)=>{
        if(wordFrequency[word]){
            wordFrequency[word]++;
        }else{
            wordFrequency[word]=1
        }
    });
    return wordFrequency;
}

const getTopTwentyWords = (wordWithFrequency:{[k:string]:number}) => {
    const wordsSortedByCount = Object.keys(wordWithFrequency).sort((word1,word2)=>wordWithFrequency[word2]-wordWithFrequency[word1])
    return wordsSortedByCount.slice(0,20)
}
const computeWordFrequencyOfTextFileFromUrl= (url:string) => {
    return axios.get(url).then((data:AxiosResponse<string>) => {
        const wordFrequency = computeWordFrequency(data.data);
        return {
            topTwentyWords:getTopTwentyWords(wordFrequency),
            wordFrequency
        }
    })
}
const buildLookUpUrlWithWord = (word:string) => {
    return LOOK_UP_URL.replace("SEARCH_WORD",word);
}

const getPOSAndSynonyms = (words:string[]) => {
    const promises:Array<Promise<AxiosResponse<LookUpResponse>>> = []
    words.forEach((word)=>{
        promises.push(axios.get<LookUpResponse>(buildLookUpUrlWithWord(word)))
    })
    return Promise.all(promises)
}

const main = () => {
    const outputObject:{[k:string]: { count:number; pos?:string; synonyms?:string[] }} = {}

    computeWordFrequencyOfTextFileFromUrl(DOCUMENT_URL).then(({topTwentyWords,wordFrequency})=> {
        getPOSAndSynonyms(topTwentyWords).then((lookUpResponsesAxiosResponse)=>{
            const lookUpResponses = lookUpResponsesAxiosResponse.map((axiosResponse)=>axiosResponse.data)
            topTwentyWords.forEach((word)=>{
                const lookUpResult = lookUpResponses.find((lookUpResponse)=>lookUpResponse.def[0]?.text?.toLowerCase() === word)
                if(lookUpResult) {
                    outputObject[word] = {
                        count: wordFrequency[word],
                        pos: lookUpResult.def[0].pos,
                        synonyms:lookUpResult.def[0].tr[0].mean?.map(({text})=>text),
                    }
                }
                else{
                    outputObject[word] = {
                        count: wordFrequency[word]
                    }
                }
            });
            console.log(outputObject);
        });
    })
}


main();
