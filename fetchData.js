const fs = require('fs');
const https = require('https');
const path = require('path');

function downloadRawData() {
  const urlRoot = 'https://raw.githubusercontent.com/TaxFoundation/';
  const files = [
    {
      name: 'IndexRanks',
      url:
        'international-tax-competitiveness-index/master/final_outputs/final_categories.csv',
    },
    {
      name: 'IndexSubranks',
      url:
        'international-tax-competitiveness-index/master/final_outputs/subcategories_2020.csv',
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
    {
      name: 'CountryCorporateNPVAllYears',
      url: 'capital-cost-recovery/master/final-data/npv_all_years.csv',
    },
    {
      name: 'TaxBurdenOnLabor',
      url: 'tax-burden-on-labor/master/final-outputs/Table1.csv',
    },
    {
      name: 'IndexRawData',
      url:
        'international-tax-competitiveness-index/master/final_outputs/raw_data_2020.csv',
    },
    {
      name: 'ConsumptionRevenue',
      url: 'consumption-taxes/main/final_outputs/revenue.csv',
    },
    {
      name: 'ReducedRates',
      url: 'consumption-taxes/main/final_outputs/reduced_rates_base.csv',
    },
    {
      name: 'Fuel',
      url: 'consumption-taxes/main/final_outputs/fuel.csv',
    },
    {
      name: 'Alcohol',
      url: 'consumption-taxes/main/final_outputs/alcohol.csv',
    },
    {
      name: 'Tobacco',
      url: 'consumption-taxes/main/final_outputs/tobacco.csv',
    },
    {
      name: 'ConsumptionData',
      url: 'consumption-taxes/main/intermediate_outputs/consumption_data.csv',
    },
  ];

  files.forEach(f => {
    const dest = path.resolve(__dirname, `static/data/${f.name}.csv`);

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
