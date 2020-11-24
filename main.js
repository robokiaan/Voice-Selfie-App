var second_speak = 5;

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
})

var SpeechRecognition = window.webkitSpeechRecognition

var recognition = new SpeechRecognition()

function take_selfie() {
    jQuery('textarea').text('')
    recognition.start()
}

recognition.onresult = function (event) {
    console.log(event)
    var Content = event.results[0][0].transcript
    jQuery('textarea').text(Content)
    console.log(Content)
    Webcam.attach(jQuery('#webcam-view'))
    speak()
}

function speak() {
    var SS = window.speechSynthesis

    var speak_data = jQuery('textarea').text()

    if (speak_data == 'take my selfie') {
        speak_data = 'taking selfie in 5 seconds'
        var interval = setInterval(function () {
            var speaking = Number(second_speak.toString().substring(0, 1)) - 1
            second_speak = speaking + ' seconds'
            if (second_speak == '1 seconds') {
                second_speak = '1 second'
            }
            if (second_speak == '0 seconds') {
                second_speak = 'now'
            }
            var second_Utter = new SpeechSynthesisUtterance(second_speak);
            SS.speak(second_Utter)
        }, 1000)
        setTimeout(function () {
            Webcam.snap(function (data_url) {
                jQuery('#webcam-result').html(`<img id='selfie_img' src='${data_url}'>`)
                save(data_url)
            })
            clearInterval(interval)
        }, 10000)
    } else {
        speak_data = 'Error 4 04 Unknown Command'
    }
    var Utter_this = new SpeechSynthesisUtterance(speak_data);
    SS.speak(Utter_this)
}

function save(url) {
    console.log(url)
    jQuery('#link').attr('download', url)
    jQuery('#link').click()
}