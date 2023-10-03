Country Profile

Items to include:

- International Index
  - Descriptive text about the International Index
  - Chart: Trend-line of country over the 7 years with last point highlighted as the current rank
  - Table: Three lowest-ranking sub-sub-categories and three highest-ranking sub-categories
- Sources of Revenue
  - Descriptive text about sources of revenue
- Corporate Taxation
  - Share of revenue statistic in descriptive text and comment about income taxes needing to be designed to allow businesses to deduct relevant costs at the time they are incurred.
  - Chart of corporate tax rate trend vs. OECD average trend since 2000
  - Capital Cost Recovery
    - Descriptive text about why capital allowances matter and how they can be measured and compared by calculating NPVs (I think otherwise the next table might be hard to understand for someone not familiar with the concept)
    - Chart of Allowances for country vs. OECD average
- Personal Income Taxation
  - Share of revenue statistic in descriptive text (individual + social insurance)
  - Table comparing country and OECD average on
    - Top personal income tax rate (OECD Table I.7.)
    - Top dividends tax rate
    - Top capital gains tax rate
- Consumption Tax
  - Share of revenue statistic in descriptive text and comment about distortions from narrow tax bases and high standard rates
  - How comprehensive is the consumption tax – big number graphic – consumption tax base as percent of total consumption
  - Main or average VAT rate (allowing for the U.S. situation)
- Property tax
  - Share of revenue statistic in descriptive text that mentions taxation of physical property can be the most efficient form of taxation
  - Table of types of property taxes (yes vs. no for seven categories)
  - Property tax revenue as a share of capital stock
- International Tax Rules
  - Descriptive text on importance of international tax rules
  - Table:
    - Number of tax treaties vs. OECD average
    - Territoriality for capital gains and dividends and country limitations, if a country limits territorial provisions just to EU countries then it doesn’t do much good for the rest of the world.

References

- International Index

  - Overall- and sub-Ranks: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/final_categories_2014_2019.csv
  - Sub-sub-category ranks: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/subcategories_2019.csv

- Sources of Revenue

  - Individual countries: https://github.com/TaxFoundation/sources-of-government-revenue/blob/master/final-outputs/oecd_by_country.csv
    - Requires ISO2 and ISO3 codes, omit useless R id codes in unlabeled first columns.
  - OECD average: https://github.com/TaxFoundation/sources-of-government-revenue/blob/master/final-outputs/oecd_averages
    - Remove unlabeled ID column

- Corporate Taxation

  - Corporate tax rates:
    - Worldwide weighted and unweighted average corporate income tax rates since 1980: https://github.com/TaxFoundation/worldwide-corporate-tax-rates/blob/master/final-outputs/rate_time_series.csv
      - Remove unlabeled ID column
      - What is column 'n'?
    - Individual countries’ corporate income tax rates since 1980: https://github.com/TaxFoundation/worldwide-corporate-tax-rates/blob/master/final-data/final_data_long.csv
      - Remove unlabeled ID column
  - Capital cost recovery - net present value of capital allowances
    - Weighted (by GDP) and unweighted OECD average since 2000: https://github.com/TaxFoundation/capital-cost-recovery/blob/master/final-outputs/npv_weighted_timeseries.csv
      - Remove unlabeled ID column
      - What is 'n' and why is it always 36?
    - Individual countries’ since 2000 (there is individual country data for years prior to 2000 as well but not for the OECD average, so we should limit the time period to “2000 – current”): https://github.com/TaxFoundation/capital-cost-recovery/blob/master/final-data/npv_all_years.csv (column “waverage”)
      - Remove unlabeled ID column
      - Optional: include ISO2

- Personal Income Taxation

  - Tax burden on labor data: https://github.com/TaxFoundation/tax-burden-on-labor/blob/master/final-outputs/Table1.csv (this might require some additional (but simple) calculations; please let me know if you would like me to do those)
  - Top personal income tax rate: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_b_individual.csv (column “top_income_rate”)
  - Top dividends tax rate: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_b_individual.csv (column “dividends_rate”)
  - Top capital gains tax rate: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_b_individual.csv (column “capital_gains_rate”)

- Consumption Tax

  - Consumption tax base as percent of total consumption: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_c_consumption.csv (column “vat_base”)
    - Include ISO codes
  - Standard VAT rate: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_c_consumption.csv (column “vat_rate”)
    - What's with row 2? If it's purely for labeling, consolidate with row 1.
    - Include ISO codes
    - Notes section at end breaks the data structure, making it useless for my purposes
  - VAT Exemption Threshold: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_c_consumption.csv (column “vat_threshold”)
  - Average Business Compliance Time (Hours per Year): https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_c_consumption.csv (column “consumption_time”)

- Property tax

  - Types of property taxes (yes vs. no for seven categories): https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_d_property.csv

- International Tax Rules
  - Number of tax treaties: https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_e_international.csv (column “tax_treaties”)
 
## Step-by-step Update Guide
1. The global policy team updates data throughout the year in various Github repositories, which ultimately need to be mapped into this repository: https://github.com/TaxFoundation/country-landing-pages/tree/master/static/data
    1. Note that the data needs to be in the same exact format as the prior year. Below is a table with mappings between the country page files and the original data sources in other repositories. 
    2. To produce [IndexRawData.csv](https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/IndexRawData.csv), you will need to manually add the last 6 columns of [table_d_propety.csv](https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_d_property.csv) (provided by the global team) to [raw_data_[CURRENT YEAR].csv](https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs). The data in [table_d_propety.csv](https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_d_property.csv) corresponds to the table in the “Property Taxes” section of the country page interactive.
        | Country Page Data File | Original Data Source |
        | --- | --- |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/Alcohol.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/final_outputs/alcohol.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/ConsumptionData.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/intermediate_outputs/consumption_data.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/ConsumptionRevenue.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/final_outputs/revenue.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/CountryCorporateNPVAllYears.csv | https://github.com/TaxFoundation/capital-cost-recovery/blob/master/final-data/npv_all_years.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/CountryCorporateTaxRates.csv | https://github.com/TaxFoundation/worldwide-corporate-tax-rates/blob/master/final_data/final_data_long.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/Fuel.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/final_outputs/fuel.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/IndexRanks.csv | https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/final_categories.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/IndexRawData.csv | https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs and https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/table_d_property.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/IndexSubranks.csv | https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/OECDCorporateTaxRates.csv | https://github.com/TaxFoundation/capital-cost-recovery/blob/master/final-outputs/cit_rates_timeseries.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/ReducedRates.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/final_outputs/reduced_rates_base.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/SourceRevenueByCountry.csv | https://github.com/TaxFoundation/sources-of-government-revenue/blob/master/final-outputs/oecd_by_country.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/SourceRevenueOECDAverage.csv | https://github.com/TaxFoundation/sources-of-government-revenue/blob/master/final-outputs/oecd_averages.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/TaxBurdenOnLabor.csv | https://github.com/TaxFoundation/tax-burden-on-labor/blob/master/final-outputs/Table1.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/Tobacco.csv | https://github.com/TaxFoundation/consumption-taxes/blob/main/final_outputs/tobacco.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/WorldwideCorporateTaxRates.csv | https://github.com/TaxFoundation/worldwide-corporate-tax-rates/blob/master/final_outputs/rate_time_series.csv |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/countries.csv | Current OECD countries list |
        | https://github.com/TaxFoundation/country-landing-pages/blob/master/static/data/countryProfiles.csv | https://github.com/TaxFoundation/international-tax-competitiveness-index/blob/master/final_outputs/country_profiles.csv |
2. Open the country data pages GitHub [repository](https://github.com/TaxFoundation/country-landing-pages/tree/master) and create new branch for the update.
3. Upload new data to the following folder, following the mappings above: https://github.com/TaxFoundation/country-landing-pages/tree/master/static/data
    1. If the original data source hasn’t been updated since the last time the country pages were updated, do not update/replace the corresponding .csv
4. Open the directory in command line
    1. Make sure latest version of node.js is installed
    2. Run `npm install`
    3. Make sure Gatsby command line is installed (`install -g gatsby-cli`)
5. Run `gatsby build`
6. Run `gatsby serve`
    1. Site should be available at [http://localhost:9000/[chart]/[country]](http://localhost:9000/%5Bchart%5D/%5Bcountry%5D) (e.g. http://localhost:9000/itci/greece)
    2. If you need to make any changes, you will have to do so in the codebase, rebuild project, and re-enter `gatsby serve` to preview each iteration
7. If everything looks good, open a pull request
    1. Github should automatically run checks and Netlify should automatically build deploy preview
8. Double-check that everything looks correct in the Netlify deploy preview before publishing deploy
