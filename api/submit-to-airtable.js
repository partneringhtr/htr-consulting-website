export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, company, email, message } = req.body || {};

    const airtableResponse = await fetch(
      'https://hooks.airtable.com/workflows/v1/genericWebhook/appIbU4xwnqjKbhO3/wflneUUeaA4U5PSfj/wtrRut4GM1g3JCW4O',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || '',
          company: company || '',
          email: email || '',
          message: message || ''
        })
      }
    );

    if (!airtableResponse.ok) {
      throw new Error('Airtable webhook responded with status ' + airtableResponse.status);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
