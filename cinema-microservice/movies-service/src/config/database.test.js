const {test,expect} = require('@jest/globals')
const database= require ('./database')



test('Connecting Database',async()=>{
    const connection = await database.connect()
    expect(connection).toBeTruthy()
})


test('Disconnecting Database',async()=>{
    const IsDisconnected = await database.disconnect()
    expect(IsDisconnected).toBeTruthy()
})

test('Disconnecting after to be disconnected to database ',async()=>{
    await database.disconnect()
    const IsDisconnected = await database.disconnect()
    expect(IsDisconnected).toBeTruthy()
})