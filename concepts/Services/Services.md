# Serviços

## Resumo

Serviços podem ser pensados como as bilbiotecas que contém funções que você talvez queira usar em diversos lugares da sua aplicação. Por exemplo, você talvez tenha um EmailService no qual agrega algum código comum que você queira usar em várias partes da aplicação. O principal benefício de usar serviços no Sails é que eles são *globais*--você não precisa usar `require()` para acessá-los.


## Como eu posso criar um Serviço? 

Simplesmente salve um arquivo Javascript contendo uma função ou objeto que na pasta **api/services**.

O nome do arquivo será usado como nome de variavel para acesso global do serviço. Por exemplo, um servicço de email talvez seja algo assim:

```javascript
// EmailService.js - api/services
module.exports = {

    sendInviteEmail: function(options) {
    
        var opts = {"type":"messages","call":"send","message":
            {
                "subject": "YourIn!",
                "from_email": "info@balderdash.co",
                "from_name": "AmazingStartupApp",
                "to":[
                    {"email": options.email, "name": options.name}
                ],
                "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
            }
        };
    
        myEmailSendingLibrary.send(opts);
        
    }
};
```

Você pode então usar `EmailService` em qualquer lugar do seu app:
You can then use `EmailService` anywhere in your app:

```javascript
// Em algum controller
  EmailService.sendInviteEmail({email: 'test@test.com', name: 'test'});
```

<docmeta name="uniqueID" value="Services157331">
<docmeta name="displayName" value="Services">

