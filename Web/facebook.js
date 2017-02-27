var myPage = {
    id: 'XXXXXXXXXXXXX',
    access_token: null,
};

function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      userLoggedIn();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      userLoggedOut();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      userLoggedOut();
    }
  }

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

function userLoggedIn() {
  btn = document.getElementById("loginButton");
  btn.className = btn.className.replace("btn-success", "btn-danger");
  document.getElementById("buttons_navbar").style.display = "block";
  btn.textContent = "Log out";
  btn.setAttribute("onclick", "logoutWithButton()");
  getPageAccessToken(myPage.id, function(token) {
      myPage.access_token = token;
      console.log(myPage.access_token);
  }); 
}

function userLoggedOut() {
   btn = document.getElementById("loginButton");
   btn.className = btn.className.replace("btn-danger", "btn-success");
   document.getElementById("buttons_navbar").style.display = "none";
   btn.textContent = "Log In";
   btn.setAttribute("onclick", "loginWithButton()")
}

function logoutWithButton() {
  FB.logout(function(response) {
      checkLoginState();
      console.log(response);
  });
}

function loginWithButton() {
  FB.login(function(response) {
      if (response.authResponse) {
        checkLoginState();
      }} , {scope: 'publish_actions,manage_pages,publish_pages'});
}

function postToPage() {
    var title = document.getElementById('previewTitle').textContent;
    var url = document.getElementById('previewUrl').textContent;
    var info = document.getElementById('previewInfo').textContent;
    var body = document.getElementById('previewBody').textContent
    var img = document.getElementById('previewImg').src;
    var msg = title + '\n' + url+ '\n' + info + '\n' + body;
    FB.api('/' + myPage.id + '/photos', 'post', {'access_token': myPage.access_token, 'caption': msg, 'url': img}, function(response) {
        if (response && !response.error) {
            alert("Post succesful!");
        }
        else
        {
            alert(response['error']['message']);
        }
    });
}

function getPageAccessToken(myPageId, callback) {
    FB.api('/me/accounts', function(response) {
        for (var i=0; i < response.data.length; i++) {
            if (response.data[i].id == myPageId) {
                console.log(response.data[i].access_token);
                callback(response.data[i].access_token);
            }
            else
            {
                callback(null);
            }
        }
    });
}

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1321362891254036',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
  });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
