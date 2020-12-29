// Github API request
function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => handleResults(responseJson))
};

function handleResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++) {
        $('.js-results').append(`
            <li>
                <a href="${responseJson[i].html_url}">${responseJson[i].name}</a>
            </li>
        `);
    };
    $('.results').removeClass('hidden');
};

// Watch for submit
function handleSubmit() {
    $('#githubSearch').submit(function(event) {
        event.preventDefault();
        $('.js-results').empty();
        const user = $('#githubHandle').val()
        getRepos(user);
    });
};

// Wait for page load
$(function() {
    handleSubmit();
});