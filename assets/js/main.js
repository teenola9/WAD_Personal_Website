// Main JS for portfolio
// Enhances the booking form on problem.html by validating inputs and generating a mailto link

document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('bookingForm');
  if(!form) return;

  var result = document.getElementById('result');

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // gather values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var party = document.getElementById('party').value;
    var message = document.getElementById('message').value.trim();

    // basic validation
    if(!name || !email){
      result.textContent = 'Please provide your name and email.';
      result.style.color = 'red';
      return;
    }

    // build email body
    var body = [];
    body.push('Name: ' + name);
    body.push('Email: ' + email);
    if(date) body.push('Date: ' + date);
    if(time) body.push('Time: ' + time);
    body.push('Party size: ' + party);
    if(message) body.push('\nMessage:\n' + message);

    var subject = encodeURIComponent('Booking/Feedback from ' + name);
    var mailBody = encodeURIComponent(body.join('\n'));

    var mailto = 'mailto:info@restaurant.example?subject=' + subject + '&body=' + mailBody;

    // open mail client
    window.location.href = mailto;

    result.textContent = 'Your email client should open with a pre-filled message. If it did not, copy the text below and email info@restaurant.example';
    result.style.color = 'green';

    // also display the generated message for fallback
    var pre = document.createElement('pre');
    pre.textContent = decodeURIComponent(mailBody);
    result.appendChild(pre);
  });
});