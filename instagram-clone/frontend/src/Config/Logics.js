export const isPostLikedByUser = (post, userId) => {
    if (post.likedByUser && post.likedByUser.length > 0) {
        for (let item of post.likedByUser) {
            if (item.id === userId) {
                return true;
            }
        }
    }
    return false;
}


export const isCommentLikedByUser = (comment, userId) => {
    if (comment.likedByUsers && comment.likedByUsers.length > 0) {
        for (let item of comment.likedByUsers) {
            if (item.id === userId) {
                return true;
            }
        }
    }
    return false;
}

export const isPostSaved = (user, postId) => {
    for (let item of user.savedPost) {
        if (item.id === postId) {
            return true;
        }
    }
    return false;
}



/*function getTimeInHours(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return hours;
}*/


function getTimeInHours(timestamp) {
    const storyDate = new Date(timestamp);
    const currentDate = new Date();
    const differenceInHours = (currentDate - storyDate) / (1000 * 60 * 60); // 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour
    return differenceInHours;
}

export const hasStory = (users) => {
    return users.reduce((acc, user) => {
        const recentStory = user.stories?.find(story => getTimeInHours(story.timeStamp) < 24);
        if (recentStory) {
            acc.push(user);
        }
        return acc;
    }, []);
};

export const isFollowing = (reqUser, user2) => {
    if (reqUser && user2) {
        for (let item of user2.follower) {
            if (reqUser.id === item.id) {
                return true;
            }
        }
    }
    return false;
}

export const isReqUser = (userId1, userId2) => {
    if (userId1 && userId2) {
        return userId1 === userId2;
    }
};

export const isReqUserPost = (post, reqUser) => {
    return post.user.id === reqUser.id;
}

export const timeDifference = (timeStamp) => {
    const date = new Date(timeStamp);
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
        return weeks + "week" + (weeks === 1 ? "" : "s") + " ago";
    } else if (days > 0) {
        return days + " day" + (days === 1 ? "" : "s") + " ago";
    } else if (hours > 0) {
        return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    } else if (minutes > 0) {
        return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    } else if (seconds > 0) {
        return seconds + " second" + (seconds === 1 ? "" : "s") + " ago";
    }
}