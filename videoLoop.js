
	var video = $x('//*[@id="movie_player"]/div[1]/video')[0]; 

	var enableSkipLoop = true;

	let intervals = [
		{start : "00:24", end : "00:29"},
	];

	const secondsToMillis = s => s * 1000;
	const minutesToMillis = m => secondsToMillis(m*60);
	const hoursToMillis = h => minutesToMillis(h*60);

	function timeToMilis(time){

		let split = time.split(':');
		split = split.reverse();

		let seconds = 0;

		if(split[0]){
			seconds+=parseInt(split[0]);
		}
		if(split[1]){
			seconds+=parseInt(split[1]*60);
		}

		if(split[2]){
			seconds+=parseInt((split[2]*60)*60);
		}


		return secondsToMillis(seconds);
	}

	intervals = intervals.map(i => {
		return {start : timeToMilis(i.start), end : timeToMilis(i.end)}
	});

	let currentIntervalIndex = 0;


	if(video){
		setInterval(function() {
			if(enableSkipLoop){
				let {currentTime} = video;
				let {start, end} = intervals[currentIntervalIndex];
				let beforeStart = currentTime < start;
				let afterEnd = currentTime > end;


				if(beforeStart){
					video.currentTime = start;
					video.pause();
					video.play();
				}else if(afterEnd){
					currentIntervalIndex = (currentIntervalIndex + 1) % intervals.length;
					video.currentTime = intervals[currentIntervalIndex].start;
					video.pause();
					video.play();
				}
			}
		},0);
	}else{
		console.log("video not found")
	}