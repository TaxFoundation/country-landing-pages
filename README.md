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
