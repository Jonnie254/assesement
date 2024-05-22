// Wait for the DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();
});

// Fetch users from the API and populate the select dropdown
function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      const userSelect = document.getElementById("users");
      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.username;
        userSelect.appendChild(option);
      });
      // Set default selected user to the first user
      userSelect.value = users[0].id;
      fetchUserData();
    });
}

// Fetch user data and display it in the profile area
function fetchUserData() {
  const userId = document.getElementById("users").value;

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const profileArea = document.getElementById("profile-area");
      const userProfileImage = `./images/twitter-clone-profile.png`;
      profileArea.innerHTML = `
                <img src="${userProfileImage}" alt="Profile image" class="profile-pic">
                <div class="person-details">
                <h2 id="name">${user.name}</h2>
                <p id="username">@${user.username}</p>
                <p id="company">${user.company.name}</p>
                <p id="work">${user.company.catchPhrase}</p>
                <div class="location-icon">
                <ion-icon name="location-outline"></ion-icon>
                <p id="location">${user.address.city}, ${user.address.street}</p>
                </div>
                </div>
      
            `;
      fetchPosts(user.name, userProfileImage);
    });
}

// Fetch posts of the selected user and display them
function fetchPosts(userName, userProfileImage) {
  const userId = document.getElementById("users").value;

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = "";
      posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
       
                    <img src="${userProfileImage}" class="profile-image" alt="Profile Image" onclick="fetchComments(${post.id})">
                    <div class="post-content" onclick="fetchComments(${post.id})">
                        <div class="post-user">${userName}
                        <img src="./images/verify.png" class="verify-icon" alt="Verified" width="20px" height="20px">
                        <img src="./images/twitter.png" class="twitter-icon" alt="Twitter" width="15px" height="15px">
                        </div>
                        <br/>
                        <div class="post-body">${post.body}</div>
                        <br/>
                        <div class="post-icons">
                        <div class="icon">
                        <i class='bx bx-message-rounded-dots'></i>
                        <p>200</p>
                        </div>
                        <div class="icon">
                       <i class='bx bx-repost'></i>
                        <p>100</p>
                        </div>
                        <div class="icon">
                        <ion-icon name="heart" style="color: red;"></ion-icon>
                        <p>300</p>
                        </div>
                        </div>
                    </div>
                `;
        postsContainer.appendChild(postDiv);
      });

      // Fetch comments for the first post by default
      if (posts.length > 0) {
        fetchComments(posts[0].id);
      }
    });
}

// Fetch comments for the selected post and display them
function fetchComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((response) => response.json())
    .then((comments) => {
      const commentsContainer = document.getElementById("comments-container");
      commentsContainer.innerHTML = "";
      // Display the post ID on top of the comments container
      const postIdHeader = document.createElement("p");
      postIdHeader.textContent = `Post  ${postId} Comments`;
      commentsContainer.appendChild(postIdHeader);
      comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        // Use the same profile image for comments as a placeholder
        const commentProfileImage = `./images/twitter-clone-profile.png`;
        commentDiv.innerHTML = `
                    <img src="${commentProfileImage}" class="profile-image" alt="Profile Image">
                   
                    <div class="comment-body">
                    <div class="comment-name">
                    <p>${comment.name}</p>
                     <img src="./images/verify.png" class="verify-icon" alt="Verified" width="20px" height="20px">
                    <img src="./images/twitter.png" class="twitter-icon" alt="Twitter" width="15px" height="15px">
                    </div>
                    <p>${comment.body} </p>
                    <hr>
                    <div class="post-icons">
                        <div class="icon">
                        <i class='bx bx-message-rounded-dots'></i>
                        <p>0</p>
                        </div>
                        <div class="icon">
                       <i class='bx bx-repost'></i>
                        <p>0</p>
                        </div>
                        <div class="icon">
                        <ion-icon name="heart" style="color: red;"></ion-icon>
                        <p>0</p>
                        </div>
                        </div></div>
                `;
        commentsContainer.appendChild(commentDiv);
      });
    });
}
