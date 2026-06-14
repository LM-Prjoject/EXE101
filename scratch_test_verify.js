async function manageHostRegistrations() {
  try {
    console.log('Fetching pending host registrations...');
    // We can fetch registrations without a token first to see if the endpoint is open, 
    // or we can test if it requires a staff token.
    const res = await fetch('https://exe.kakgonbri.party/api/Host/registrations?approveFilter=1&page=1&pageSize=50', {
      method: 'GET'
    });
    
    console.log('Status:', res.status);
    const bodyText = await res.text();
    console.log('Response body:', bodyText);

    let list = [];
    try {
      const parsed = JSON.parse(bodyText);
      list = parsed.data || parsed.Data || parsed.items || parsed.Items || parsed || [];
    } catch (e) {}

    if (Array.isArray(list) && list.length > 0) {
      console.log('\n--- Pending Host Registrations ---');
      list.forEach(reg => {
        console.log(`User ID: ${reg.userId}, Name: ${reg.userName}, Created: ${reg.createdOn}, Approved: ${reg.approved}`);
      });
      
      // Let's print out how to approve them
      console.log('\nTo approve a user, you can call updateHostRegistration API.');
    } else {
      console.log('No pending registrations found (or endpoint returned empty/failed).');
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

manageHostRegistrations();
