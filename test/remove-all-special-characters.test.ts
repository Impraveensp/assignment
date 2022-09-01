import { removeAllSpecialCharactersAndNumbers } from "../src";

describe("remove all special charaters",()=>{
    it("should return text without special characters",()=>{
        const obtainedText = removeAllSpecialCharactersAndNumbers(`**Welcome To The World of Free Plain Vanilla Electronic Texts**

**eBooks Readable By Both Humans and By Computers, Since 1971**

*****These eBooks Were Prepared By Thousands of Volunteers!*****`)
        expect(obtainedText).toEqual(`Welcome To The World of Free Plain Vanilla Electronic Texts

eBooks Readable By Both Humans and By Computers Since 

These eBooks Were Prepared By Thousands of Volunteers`)
    })

    it("should return text without special characters 2",()=>{
        const obtainedText = removeAllSpecialCharactersAndNumbers(`"Frequently."

"How often?"

"Well, some hundreds of times."`)
        expect(obtainedText).toEqual(`Frequently

How often

Well some hundreds of times`)
    })
})
