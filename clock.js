params = window.location.search.substring(window.location.search.indexOf('?') + 1);


times = []

nums = params.split('+')
for (let time in nums) {
    times.push(parseInt(nums[time]));
}

if (times.length === 1 && isNaN(times[0])) {
    window.location.href = 'index.html';
}
