const d = new Date()
let challenges = {
    usedButtons : [],
    daysPassed : Math.ceil(d.getMonth() * 30.5 + d.getDate() - 31),  //calculate the days passed this year
    easy : ['watch a documentary', 'learn a cool fact', 'do a big stretch', 'eat a fruit', 'throw something away you dont use', 'listen to a new song', 'start the day with a big glass of water', 'do todays wordle', 'close your eyes for one minute', 'make your bed', 'touch grass lol', 'pet a dog', 'tell someone a joke', 'do todays mathler', 'walk 1 km', 'take a picture of yourself', 'change one song in your spotify playlist', 'clean your desk', 'doodle something'],
    medium : ['send someone a text', 'call someone', 'do a sudoku', 'lean a cool small trick', 'walk 5 km', 'walk at least 30 minutes', 'go for a cold shower', 'help someone', 'call a relative', 'clean a room', 'spend two hours less on your screen', 'read something physical', 'play a board game', 'compliment someone', 'work on a hobby you have', 'continue a project you started', 'do a small task you have been procrastinating for a while'],
    hard :['learn something you have always wanted to learn', 'go for a long jog', 'go somewhere you have never been', 'deepclean something', 'walk 10 km', 'eat your favorite food', 'do something nice for another person', 'text someone you have not spoken to in years', 'only drink water today', 'practice a new sport', 'go for a long walk/hike', 'talk to someone new', 'try out a new food', 'minimalize you carb intake', 'fast for a day', 'read for an hour'],
    setup : function() {
        this.challengeDisplay()
        if (!this.getCookie('total')) {
            this.storeCookie('total', '0', '365')
        }
        this.displayTime()
        if (!this.getCookie('usedButtons')) {
            this.storeCookie('usedButtons', JSON.stringify(this.usedButtons),'365')
        }
        if (this.dayHasPassed(this.daysPassed)) {
            this.storeCookie('usedButtons', '[]', '365')
        }
        challenges.pointCounter(0,0)
        console.log(document.cookie)
        this.opacityChange(JSON.parse(this.getCookie('usedButtons')), 40)
    },
    dayHasPassed : function(today) {
        let lastVisitDate;
        console.log(today)
        if (this.getCookie('lastVisitDate')) {
            lastVisitDate = JSON.parse(this.getCookie('lastVisitDate'))
            if (lastVisitDate < today) {
                lastVisitDate = today
                this.storeCookie('lastVisitDate', JSON.stringify(lastVisitDate), '365')
                return true
            }
        }
        lastVisitDate = today
        
        this.storeCookie('lastVisitDate', JSON.stringify(lastVisitDate), '365')
        
        return false
    },
    pointCounter : function(points, button) {
        let visibleTotal = document.getElementById('scoreCount')
        let total = JSON.parse(this.getCookie('total'))
        let usedButtonsCookie = JSON.parse(this.getCookie('usedButtons'))
        this.usedButtons = JSON.parse(this.getCookie('usedButtons'))
        console.log(JSON.parse(this.getCookie('usedButtons')))
        if (this.usedButtons) {
            if (contains(usedButtonsCookie,button)) {
                console.log('the array contains a target that was already in the array')
            } else {
                total += points
                if (button != 0) {
                    this.usedButtons.push(button)
                }
                this.storeCookie('usedButtons', JSON.stringify(this.usedButtons),'365')
                this.opacityChange(this.usedButtons, 40)
            }
        }
        visibleTotal.innerHTML	= total + ' points'
        this.storeCookie('total', JSON.stringify(total), '365')
        console.log(document.cookie, this.usedButtons)  
    },
    challengeDisplay : function() {
        let easyEl = document.getElementById('boxDescription1')
        let mediumEl = document.getElementById('boxDescription2')
        let hardEl = document.getElementById('boxDescription3')
        easyEl.innerHTML = this.easy[this.daysPassed % this.easy.length]
        mediumEl.innerHTML = this.medium[this.daysPassed % this.medium.length]
        hardEl.innerHTML = this.hard[this.daysPassed % this.hard.length]
    },
    storeCookie : function(name, value, expirationDate) {
        d.setTime(d.getTime() + (expirationDate*24*60*60*1000)) // covert days to miliseconds
        document.cookie = name + "=" + value + ";" + "expires="+ d.toUTCString() + ";path=/" // cookie has to be in format: 'name=value;expires=ms;path=/'
    },
    getCookie : function(name) {
        name = name + '='
        let decodedCookie = decodeURIComponent(document.cookie)
        let cookieArray = decodedCookie.split(';')
        for (i=0; i<cookieArray.length; i++) {
            let cookie = cookieArray[i]
            while(cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1)
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length)
            }
        } 
        return ''
    },
    deleteAllCookies : function() {
        let cookies = document.cookie.split(";")
        for (i=0; i<cookies.length; i++) {
            var cookie = cookies[i]
            var eqPos = cookie.indexOf("=")
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
        this.usedButtons = []
        this.setup()

    },
    displayTime : function() {
        let time = new Date
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        document.getElementById('date').innerHTML = time.getDate() + ' ' + months[time.getMonth()] + ' ' + time.getFullYear() // display the date on screen
    },
    opacityChange : function(elementIdArray, opacity) {
        for (i=0; i<elementIdArray.length; i++) {
            console.log(document.getElementsByClassName(elementIdArray[i]))
            document.getElementById(elementIdArray[i]).style.opacity = opacity + '%'
        }
    }
}
//console.log('medium: ' + challenges.medium[challenges.daysPassed % challenges.medium.length])

function contains(objectArr,target) {
    for(i=0;i<objectArr.length;i++) {
        if (objectArr[i] === target) {
            return true
        }
    }
    return ''
}

challenges.setup()

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

console.log(shuffle(['learn a cool fact', 'eat a fruit', 'watch a documentary', 'clean your desk', 'throw something away you dont use', 'tell someone a joke',  'start the day with a big glass of water', 'pet a dog', 'take a picture of yourself', 'doodle something', 'make your bed', 'do a big stretch', 'touch grass lol', 'close your eyes for one minute', 'do todays wordle','do todays mathler', 'listen to a new song', 'change one song in your spotify playlist', 'walk 1 km']))
console.log(shuffle(['compliment someone', 'do a small task you have been procrastinating for a while', 'play a board game', 'go for a cold shower', 'lean a cool small trick', 'send someone a text', 'call someone', 'clean a room', 'read something physical', 'continue a project you started', 'work on a hobby you have', 'walk at least 30 minutes', 'do a sudoku', 'spend two hours less on your screen', 'walk 5 km', 'help someone', 'call a relative']))
console.log(shuffle(['talk to someone new', 'try out a new food', 'go for a long walk/hike', 'learn something you have always wanted to learn', 'deepclean something', 'text someone you have not spoken to in years', 'go for a long jog', 'go somewhere you have never been', 'fast for a day', 'minimalize you carb intake', 'read for an hour', 'only drink water today', 'do something nice for another person', 'eat your favorite food', 'walk 10 km', 'practice a new sport']))


// easy 'learn a cool fact', 'eat a fruit', 'watch a documentary', 'clean your desk', 'throw something away you dont use', 'tell someone a joke',  'start the day with a big glass of water', 'pet a dog', 'take a picture of yourself', 'doodle something', 'make your bed', 'do a big stretch', 'touch grass lol', 'close your eyes for one minute', 'do todays wordle','do todays mathler', 'listen to a new song', 'change one song in your spotify playlist', 'walk 1 km'
// medium 'compliment someone', 'do a small task you have been procrastinating for a while', 'play a board game', 'go for a cold shower', 'lean a cool small trick', 'send someone a text', 'call someone', 'clean a room', 'read something physical', 'continue a project you started', 'work on a hobby you have', 'walk at least 30 minutes', 'do a sudoku', 'spend two hours less on your screen', 'walk 5 km', 'help someone', 'call a relative'
// hard 'talk to someone new', 'try out a new food', 'go for a long walk/hike', 'learn something you have always wanted to learn', 'deepclean something', 'text someone you have not spoken to in years', 'go for a long jog', 'go somewhere you have never been', 'fast for a day', 'minimalize you carb intake', 'read for an hour', 'only drink water today', 'do something nice for another person', 'eat your favorite food', 'walk 10 km', 'practice a new sport'
