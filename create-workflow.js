const https = require('https');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZjFmNzYyNC1mMWM4LTRiN2ItYTE4OS02YTQ3OGQ0MDUyOWIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNGM5Yzk3ZDQtNGRlYS00NGI4LWJkMzMtMzllMzg0MWFiOTYzIiwiaWF0IjoxNzczNDc5ODY5LCJleHAiOjE3NzYwMzEyMDB9.YiZW-9XW1fov3lY09gn_22WFKW8D732YbTn9_lFx-fw';

const workflow = {
  name: 'test 1',
  settings: {},
  nodes: [
    {
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [250, 300],
      parameters: {}
    },
    {
      name: 'Debug Output',
      type: 'n8n-nodes-base.debug',
      typeVersion: 1,
      position: [450, 300],
      parameters: {}
    }
  ],
  connections: {
    'Manual Trigger': {
      main: [
        [
          {
            node: 'Debug Output',
            type: 'main',
            index: 0
          }
        ]
      ]
    }
  }
};

const data = JSON.stringify(workflow);

const options = {
  hostname: 'fedemaso.app.n8n.cloud',
  port: 443,
  path: '/api/v1/workflows',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'X-N8N-API-KEY': token
  }
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', responseData);
    try {
      const parsed = JSON.parse(responseData);
      if (parsed.id) {
        console.log('\n✅ Workflow creato con ID:', parsed.id);
        console.log('Nome:', parsed.name);
      }
    } catch (e) {
      // response non è JSON
    }
  });
});

req.on('error', (error) => {
  console.error('Errore:', error);
});

req.write(data);
req.end();
