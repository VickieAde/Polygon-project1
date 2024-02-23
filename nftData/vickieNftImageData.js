const fs = require('fs');
const path = require('path');
console.log(__dirname);

for (let i =  1; i <=  5; i++) {

  const json = {
      name: `VickieToken Data #${i}`, 
      description: `VickieTokenDescription #${i}`,
      image: `https://gateway.pinata.cloud/ipfs/QmTQMZ1fS5RK9rXg2jfgp6YTWoa5qAta153Vu4o8jkbkQL/${i}.jpeg`,
      attributes: [ 
          {trait_type: 'Speed', value: 'Fast'},
          {trait_type: 'Type', value: 'Awesome'},
          {trait_type: 'Background', value: 'SkyBlue'}
      ]
  };

  fs.writeFileSync(
    path.join(__dirname, 'vickieImageData', String(i)),
    JSON.stringify(json)
  );
}
