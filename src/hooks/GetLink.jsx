const GetLink = (message) => {

    const exRegex = /(img)|(embed)|(video)/gm
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const links = message.message.match(urlRegex)
    const exemptions = message.message.match(exRegex)

    if(exemptions != null){
        return message.message
    } else if(links != null){

        const newText = message.message.replace(links[0], `<a href="${links}", target="_blank">${links}</a>`)

        return newText

    } else {

        return message.message
    }

}

export default GetLink

