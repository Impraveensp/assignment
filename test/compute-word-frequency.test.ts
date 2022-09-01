import {computeWordFrequency} from "../src";

describe("compute word frequency",()=>{
    it("should return empty object",()=>{
        const wordFrequency = computeWordFrequency("")
        expect(wordFrequency).toEqual({})
    })

    it("should return frequency count of words",()=>{
        const wordFrequency = computeWordFrequency("I see it, I deduce it.")
        expect(wordFrequency).toEqual({
            i:2,
            it:2,
            deduce:1,
            see:1,
        })
    })
})
