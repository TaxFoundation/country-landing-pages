const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadRawData() {
  const urlRoot = 'https://raw.githubusercontent.com/TaxFoundation/';
  const files = [
    {
      name: 'IndexRanks',
      url:
        'international-tax-competitiveness-index/master/final_outputs/final_categories_2014_2019.csv',
    },
    {
      name: 'IndexSubranks',
      url:
        'international-tax-competitiveness-index/master/final_outputs/subcategories_2019.csv',
    },
    {
      name: 'SourceRevenueByCountry',
      url:
        'sources-of-government-revenue/master/final-outputs/oecd_by_country.csv',
    },
    {
      name: 'SourceRevenueOECDAverage',
      url:
        'sources-of-government-revenue/master/final-outputs/oecd_averages.csv',
    },
    {
      name: 'WorldwideCorporateTaxRates',
      url:
        'worldwide-corporate-tax-rates/master/final-outputs/rate_time_series.csv',
    },
    {
      name: 'CountryCorporateTaxRates',
      url:
        'worldwide-corporate-tax-rates/master/final-data/final_data_long.csv',
    },
    {
      name: 'OECDCorporateTaxRates',
      url:
        'capital-cost-recovery/master/final-outputs/npv_weighted_timeseries.csv',
    },
  ];

  files.forEach(f => {
    const dest = path.resolve(__dirname, `src/data/${f.name}.csv`);

    fs.access(dest, err => {
      if (!err) {
        fs.unlinkSync(dest);
        console.log(`Removed old copy of ${f.name}.csv`);
      }
      const file = fs.createWriteStream(dest);
      const req = https.get(`${urlRoot}${f.url}`);

      req.on('response', response => {
        if (response.statusCode !== 200) {
          console.log(
            `Response for ${f.name} was ${response.statusCode}, not downloaded`
          );
        }
        response.pipe(file);
      });

      file.on('finish', () =>
        file.close(() => console.log(`Wrote ${f.name}.csv`))
      );

      req.on('error', err => {
        fs.unlink(dest, () =>
          console.log(
            `There was an error with the request for ${f.name}: ${err}`
          )
        );
      });

      file.on('error', err => {
        fs.unlink(dest, () => {
          console.log(`There was an error writing ${f.name}: ${err}`);
        });
      });
    });
  });
}

downloadRawData();
