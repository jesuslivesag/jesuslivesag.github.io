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
			const latestVideos = videoArray.filter((value,index) => { return index < 2}).reverse();
			setMainVideoSrc(latestVideos);
			setMainVideoTitle(latestVideos);
			createGallery(videoArray);
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

	function createImage(imgSrc){
		var image = document.createElement("img");
		image.classList.add("videoThumb");
		image.src = imgSrc;
		return image;
	}

	function createAnchor(urlSrc, imgSrc){
		var anchor = document.createElement("a");
		anchor.classList.add("fancybox", "fancybox.iframe");
		anchor.href = urlSrc;
		anchor.appendChild(createImage(imgSrc));
		return anchor;
	}

	function createFigure(urlSrc, imgSrc){
		var figure = document.createElement("figure");
		figure.appendChild(createAnchor(urlSrc, imgSrc));
		return figure;
	}

	function createTitle(vidTitle){
		var title = document.createElement("h4");
		title.classList.add("videoTitle");
		title.appendChild(document.createTextNode(vidTitle));
		return title;
	}

	function createArticle(urlSrc, imgSrc, vidTitle){
		var article = document.createElement("article");
		article.classList.add("video");
		article.appendChild(createFigure(urlSrc, imgSrc));
		article.appendChild(createTitle(vidTitle));
		return article;
	}

	function createGallery(videoList){
		var gallery = document.getElementById('videos-gallery');
		var div = document.createElement("div");
		div.classList.add("gallery");		
		for (let index = 2; index < videoList.length; index++) {
			const videoUrl = "//www.youtube.com/embed/" + videoList[index][0];
			div.appendChild(createArticle(videoUrl, videoList[index][2], videoList[index][1]));
		}
		gallery.appendChild(div);
	}

});


