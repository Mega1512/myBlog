$(document).ready(function() {
  let users = [];
  let currentUser = null;

  function showLoginForm() {
    $('#login-form').show();
    $('#register-form').hide();
    $('#post-form').hide();
    $('#login-link').show();
    $('#register-link').show();
    $('#logout-link').hide();
  }

  function showRegisterForm() {
    $('#login-form').hide();
    $('#register-form').show();
    $('#post-form').hide();
    $('#login-link').show();
    $('#register-link').show();
    $('#logout-link').hide();
  }

  function showPostForm() {
    $('#login-form').hide();
    $('#register-form').hide();
    $('#post-form').show();
    $('#login-link').hide();
    $('#register-link').hide();
    $('#logout-link').show();
  }

  function isAuthenticated() {
    return localStorage.getItem('authenticated') === 'true';
  }

  if (isAuthenticated()) {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    showPostForm();
  } else {
    showLoginForm();
  }

  $('#login-form').on('submit', function(event) {
    event.preventDefault();
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUser = user;
      showPostForm();
    } else {
      alert('Invalid username or password');
    }
  });

  $('#logout-link').click(function() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLoginForm();
  });

  $('#register-form').on('submit', function(event) {
    event.preventDefault();
    const username = $('#register-username').val();
    const password = $('#register-password').val();

    if (username.trim() === '' || password.trim() === '') {
      alert('Username and password cannot be empty.');
      return;
    }

    if (users.some(user => user.username === username)) {
      alert('Username already exists. Please choose another username.');
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('authenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    currentUser = newUser;
    showPostForm();
  });

  $('#post-form').on('submit', function(event) {
    event.preventDefault();
    const title = $('#post-title').val();
    const content = $('#post-content').val();

    const postHtml = `
      <div class="list-group-item">
        <h3>${title}</h3>
        <p>${content}</p>
        <p><small>Posted by: ${currentUser.username}</small></p>
      </div>
    `;

    $('#posts').prepend(postHtml);

    $('#post-title').val('');
    $('#post-content').val('');
  });

  $('#login-link').click(function() {
    showLoginForm();
  });

  $('#register-link').click(function() {
    showRegisterForm();
  });
});
