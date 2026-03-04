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
    const counters = [
        { id: 'counter1', finalValue: 1250000, prefix: '$', isCount: true },
        { id: 'counter2', finalValue: 5000000, prefix: '', isCount: true },
        { id: 'counter3', finalValue: 42, prefix: '', isCount: true },
        { id: 'counter4', finalValue: 1250, prefix: '', isCount: true }
    ];
    
    counters.forEach(counter => {
        let currentValue = 0;
        const targetValue = counter.finalValue;
        const element = document.getElementById(counter.id);
        
        // Random increment rate for each counter
        const incrementRate = Math.ceil(targetValue / 100);
        
        function incrementCounter() {
            const increment = Math.random() * incrementRate + 10;
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(interval);
            }
            
            let displayValue;
            if (counter.id === 'counter1') {
                displayValue = '$' + Math.floor(currentValue).toLocaleString();
            } else {
                displayValue = Math.floor(currentValue).toLocaleString();
            }
            
            element.textContent = displayValue;
        }
        
        const interval = setInterval(incrementCounter, Math.random() * 100 + 50);
    });
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
