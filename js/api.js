$(function () {
	let videoArray = new Array();
	const getVideoId = (array) => {return array[0] };
	const getVideoTitle = (array) => {return array[1] };
	const getVideoImg = (array) => {return array[2] };
	const embedURL = (videoId) => { return "https://www.youtube.com/embed/" + videoId + '?rel=0&amp;showinfo=0'};
	const viewURL = (videoId) => { return "https://www.youtube.com/watch?v=" + videoId};

	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/search",
		datatype: "json",
		data: {
			part: 'snippet',
			channelId: 'UC8YADFpAa4BFBSYUmkYwWvA',
			maxResults: 10,
			order: 'date',
			type: 'video',
			fields:'items(id/videoId,snippet(thumbnails/high/url,title))',
			key: 'AIzaSyBlq5YOCz42CLmQIDCfny0xrcOyaDCFQgA'
		},
		success: function (data) {
			var list = data.items;
			for (let index = 0; index < list.length; index++) {
				const element = list[index];
				let tempArray = new Array(element.id.videoId,element.snippet.title,element.snippet.thumbnails.high.url);				
				videoArray.push(tempArray);
			}
			const latestVideos = videoArray.filter((value,index) => { return index < 2}).reverse()			
			setMainVideoSrc(latestVideos);
			setMainVideoTitle(latestVideos);
		}
	});
	function setMainVideoSrc(videos){
		let videoDiv = document.getElementsByClassName('latest-video');
		for (let index = 0; index < videos.length; index++) {
			videoDiv[index].src = embedURL(getVideoId(videos[index]));
		}	
	}
	
	function setMainVideoTitle(videos){
		let titleDiv = document.getElementsByClassName('vid-title');
		for (let index = 0; index < videos.length; index++) {
			titleDiv[index].innerText = getVideoTitle(videos[index]);
		}
	}
});


