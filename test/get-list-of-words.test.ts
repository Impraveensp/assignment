import { getListOfAllWords} from "../src";

describe("should return list of all words in a text",()=>{
    it("should return list of words",()=>{

        const obtainedWords = getListOfAllWords("abc sdf cvv vvv      sdf sdf     sdf")
        expect(obtainedWords).toEqual(["abc","sdf","cvv","vvv","sdf","sdf","sdf"])
    })

    it("should return list of words for multiline string",()=>{
        const inputString=`Hi
        how are you
        
        I am Fine
        
        Thanks`
        const obtainedWords = getListOfAllWords(inputString)
        expect(obtainedWords).toEqual(["Hi","how","are","you","I","am","Fine","Thanks"])
    })
})
