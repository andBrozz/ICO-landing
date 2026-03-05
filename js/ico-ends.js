// Timer functionality
function initICOTimer() {
    // Get next Friday 9 PM GMT+2
    function getNextFridayTarget() {
        const now = new Date();
        // Current time in GMT+2 (considering DST)
        const offset = now.getTimezoneOffset();
        const gmt2Offset = -120; // GMT+2 in minutes
        const localNow = new Date(now.getTime() + (offset - gmt2Offset) * 60000);
        
        // Get day of week (0-6, where 5 is Friday)
        let daysUntilFriday = (5 - localNow.getDay() + 7) % 7;
        if (daysUntilFriday === 0 && localNow.getHours() >= 21) {
            daysUntilFriday = 7;
        }
        
        const target = new Date(localNow);
        target.setDate(target.getDate() + daysUntilFriday);
        target.setHours(21, 0, 0, 0); // 9 PM
        
        return target;
    }
    
    const targetTime = getNextFridayTarget();
    
    function updateTimer() {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const gmt2Offset = -120;
        const localNow = new Date(now.getTime() + (offset - gmt2Offset) * 60000);
        
        const timeDifference = targetTime - localNow;
        
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Counter animation functionality
function initCounters() {
    // Get saved values from localStorage or use defaults
    let worthValue = parseFloat(localStorage.getItem('worthValue')) || 1250000;
    let btcValue = parseFloat(localStorage.getItem('btcValue')) || 42;
    let ownersValue = parseFloat(localStorage.getItem('ownersValue')) || 1250;
    
    // Worth of tokens - infinite growth with random increments
    const worthElement = document.getElementById('counter1');
    const worthInterval = setInterval(() => {
        const randomIncrement = Math.random() * 10000 + 5000; // 5000 to 15000
        worthValue += randomIncrement;
        worthElement.textContent = '$' + Math.floor(worthValue).toLocaleString();
        localStorage.setItem('worthValue', worthValue.toString());
    }, 1000);
    
    // Tokens - static value
    const tokensElement = document.getElementById('counter2');
    const staticTokensValue = 5000000;
    tokensElement.textContent = staticTokensValue.toLocaleString();
    
    // BTC Raised - infinite growth with 0.7 increment, max is tokens count
    const btcElement = document.getElementById('counter3');
    const maxBTC = staticTokensValue; // Cannot exceed tokens count
    const btcInterval = setInterval(() => {
        const randomIncrement = Math.random() * 0.7; // 0 to +0.7
        btcValue += randomIncrement;
        
        // Ensure BTC doesn't exceed tokens
        if (btcValue > maxBTC) {
            btcValue = maxBTC;
        }
        
        btcElement.textContent = btcValue.toFixed(2);
        localStorage.setItem('btcValue', btcValue.toString());
    }, 1000);
    
    // Owners - grows every second by 0.5 to 1.5
    const ownersElement = document.getElementById('counter4');
    const ownersInterval = setInterval(() => {
        const randomIncrement = (Math.random() * 1) + 0.5; // 0.5 to 1.5
        ownersValue += randomIncrement;
        ownersElement.textContent = Math.floor(ownersValue);
        localStorage.setItem('ownersValue', ownersValue.toString());
    }, 1000);
    
    // Set initial values on page load
    worthElement.textContent = '$' + Math.floor(worthValue).toLocaleString();
    btcElement.textContent = btcValue.toFixed(2);
    ownersElement.textContent = Math.floor(ownersValue);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initICOTimer();
    initCounters();
});

// Also initialize if script loads after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initICOTimer();
        initCounters();
    });
} else {
    initICOTimer();
    initCounters();
}
