< head >
    <
    meta charset = "utf-8" >
    <
    link href = "https://fonts.googleapis.com/css?family=Roboto"
rel = "stylesheet" >
    <
    title > SpotWatson - Chat < /title> <
    /head>

    <
    body >
    <
    header >
    <
    h1 > < span > Spot < /span>Watson</h
1 >
    <
    /header> <
    section >
    <
    div id = "chat_box"
class = "content" >
    <
    /div> <
    /section> <
    footer >
    <
    input type = "text"
id = "user"
placeholder = "Username"
onfocus = "this.placeholder = ''"
onblur = "this.placeholder = 'Username'" / >
    <
    input type = "text"
id = "message"
placeholder = "Mensagem"
onfocus = "this.placeholder = ''"
onblur = "this.placeholder = 'Mensagem'" / >
    <
    button type = "submit"
name = "send_btn"
id = "send_btn"
onclick = "sendMessage()" > Enviar < /button>        </footer >
    <
    /body>

    <
    script type = "text/javascript" >
    var wsUri = "ws://{{req.headers.host}}/ws/chat";
var ws = new WebSocket(wsUri);

function createSystemMessage(message) {
    var message = document.createTextNode(message);

    var messageBox = document.createElement('p');
    messageBox.className = 'system';

    messageBox.appendChild(message);

    var chat = document.getElementById('chat_box');
    chat.appendChild(messageBox);
}

function createUserMessage(user, message) {
    var userBox = '<span class="username">';
    userBox += user + ': ';
    userBox += '</span>';


    var url = message;
    if (message.indexOf('http') >= 0) {
        //message = '<a target="_blank" href="' + message + '">go to url preview</a>';
        //message += '<audio controls><source src="' + url + '" type="audio/mpeg">Your browser does not support the audio element.</audio>';
        message = '<img src="' + message + '" style="width:128px;height:128px;">'
    }

    if (message.indexOf('spotify:') >= 0) {
        message = '<iframe src="https://embed.spotify.com/?uri=' + message + '" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>'
    }


    var messageBox = document.createElement('p');
    messageBox.innerHTML = userBox + message;

    var chat = document.getElementById('chat_box');
    chat.appendChild(messageBox);
}

ws.onopen = function (ev) {
    createSystemMessage('[Connected]');
    var payload = {
        message: "ola",
        user: "system",
        ts: (new Date()).getTime()
    };

    ws.send(JSON.stringify(payload));
};

ws.onclose = function (ev) {
    createSystemMessage('[Disconnected]');
}

ws.onmessage = function (ev) {
    var payload = JSON.parse(ev.data);
    createUserMessage(payload.user, payload.message);

    var chat = document.getElementById('chat_box');
    chat.scrollTop = chat.scrollHeight;

}

function sendMessage() {
    var user = document.getElementById('user');
    var message = document.getElementById('message');
    document.getElementById('user').disabled = true;

    var payload = {
        message: message.value,
        user: user.value,
        ts: (new Date()).getTime()
    };

    ws.send(JSON.stringify(payload));
    message.value = "";
};
// Apertar Enter e ir
document.getElementById("message")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("send_btn").click();
        }
    });

<
/script>

<
style type = "text/css" >
    *
    {
        margin: 0 px;
        padding: 0 px;
        background - color: transparent;
        color: #ecebe8;
        font - size: 16 px;
    }
html, body {
    background - color: #0f0f0f;
    margin: 0px;
    text-align: center;
    height: 100%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
}
header, footer{
    padding: 5px;
}
h1{
    font-weight: normal;
    font-size: 40px;
}
span{
    color:# 21 D05F;
    font - weight: bold;
    font - size: inherit;
}
section {
    height: 78 % ;
    margin: auto;
    background - color: #151515;
}
button{
    color: # ecebe8;
    background - color: #21D05F;
    border: none;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    padding: 5px 10px;
    -webkit- transition: all .3s;
    -o- transition: all .3s;
    -moz- transition: all .3s;
    transition: all .3s;
}
button:hover{
    background-color: # 2 A9A52;
}
input {
    width: 20 % ;
    border: none;
    border - bottom: solid #828282 1px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    padding: 2px;
    margin: 5px;
}
# chat_box {
        background - color: transparent;
        height: 95 % ;
        width: 95 % ;
        text - align: justify;
        margin: 0 auto;
        padding: 10 px;
        overflow: auto;
    }#
    chat_box p {
        width: 100 % ;
        margin: 5 px;
    }
    .system {
        text - align: center;
        color: #828282;
    font-size: 14px;
}
# user {
            width: 20 % ;
        }#
        message {
            width: 50 % ;
        }#
        especial {
            background - color: transparent;
            font - size: 18 px;
            padding - top: 10 % ;
            height: auto;
        }#
        especial input {
            width: 50 % ;
        }

        @media only screen and(max - height: 400 px) {
            h1 {
                font - size: 30 px;
            }#
            chat_box {
                height: 90 % ;
            }
            @media(max - height: 350 px) {
                h1 {
                    font - size: 27 px;
                }
                section {
                    height: 68 % ;
                }
            }
            @media(max - height: 320 px) {
                section {
                    height: 60 % ;
                }
            }
        }
        @media only screen and(max - height: 480 px) and(min - height: 401 px) {
            h1 {
                font - size: 35 px;
            }
            section {
                height: 70 % ;
            }
            @media(min - height: 450 px) {
                section {
                    height: 75 % ;
                }
            }
        }
        @media only screen and(min - height: 600 px) {
            section {
                height: 80 % ;
            }
        }

        @media only screen and(max - width: 380 px) {
            header,
            footer {
                padding: 3 px;
            }#
            user {
                width: 65 % ;
            }#
            message {
                width: 70 % ;
            }
            button {
                padding: 3 px 7 px;
            }
            @media(max - width: 350 px) {
                section {
                    height: 72 % ;
                }
            }
            @media(min - height: 550 px) {
                section {
                    height: 78 % ;
                }
            }
        }
        @media only screen and(min - width: 380 px) and(min - height: 530 px) {
            header,
            footer {
                padding: 8 px
            }
        }
        @media only screen and(min - width: 450 px) and(min - height: 401 px) {
            *{
                font - size: 18 px;
            }
            .system {
                font - size: 16 px;
            }
        }
        @media only screen and(min - width: 600 px) {#
            chat_box {
                width: 85 % ;
            }#
            especial input {
                width: 40 % ;
            }
        }
        @media only screen and(min - width: 900 px) {#
                chat_box {
                    width: 70 % ;
                }#
                especial input {
                    width: 30 % ;
                }
            }

            <
            /style>
