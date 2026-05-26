async function run() {
  try {
    const res = await fetch('https://exe.kakgonbri.party/api/workshop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "Test",
        location: "Test",
        categoryId: 1,
        levelId: 1,
        schedules: []
      })
    });
    console.log('Status:', res.status);
    console.log('Headers:', [...res.headers.entries()]);
    console.log('Body:', await res.text());
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
