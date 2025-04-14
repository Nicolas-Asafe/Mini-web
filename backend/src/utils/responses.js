export function Response(message, result, data) {
    if (!message || result === undefined) {
        return ['Missing required parameters in Response function', false];
    }
    return [message, result, data];
}


export function ReceiveResponse(response, reshandler) {
    const [msg, res, data] = response;
    if (res) {
        return data
        ? reshandler.json({ message: msg, data: data })
        : reshandler.json({ message: msg })
    }
    else{
        reshandler.status(404).json({ message: msg })
    }
}