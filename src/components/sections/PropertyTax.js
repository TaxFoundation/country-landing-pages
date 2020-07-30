import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PropTaxTable = styled.table`
  background-color: #fff;
  border: 1px solid #333;
  border-collapse: collapse;
  font-size: 0.8rem;

  thead tr {
    border-bottom: 1px solid #333;
  }

  th {
    font-weight: 700;
    text-align: center;
    padding: 0.8rem;
  }

  tbody tr:nth-of-type(even) {
    background-color: #eee;
  }

  td {
    font-family: 'Roboto Mono', monospace;
    padding: 0.8rem;

    &:nth-of-type(3) {
      text-align: center;
    }
  }
`;

const KeyFigures = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template: auto / 1fr;

  @media (min-width: 800px) {
    grid-template: auto / repeat(2, 1fr);
  }

  & > div > div {
    border: 1px solid #333;
    font-size: 2.4rem;
    font-weight: 300;
    padding: 2rem;
    text-align: center;
  }
`;

const PropertyTax = ({ countryName, countryArticle, data, id }) => {
  const rows = [
    {
      category: 'Net Wealth Tax',
      description:
        'Net wealth taxes are taxes on an individual’s or family’s net assets levied on an annual basis.',
      id: 'net_wealth',
    },
    {
      category: 'Estate, Inheritance, or Gift Tax',
      description:
        'Estate taxes are levied on the property of the deceased and are paid by the estate itself. Inheritance taxes are only levied on the value of assets transferred and are paid by the heirs. Gift taxes are levied when property is transferred by a living individual.',
      id: 'estate_or_inheritance_tax',
    },
    {
      category: 'Property Transfer Tax',
      description:
        'Property transfer taxes are taxes on the transfer of real property (real estate, land improvements, machinery) from one person or business to another.',
      id: 'transfer_tax',
    },
    {
      category: 'Corporate Asset Tax',
      description:
        'Similar to a net wealth tax, asset taxes are levied on the wealth, or assets, of a business. Most countries with corporate asset taxes levy these taxes exclusively on bank assets.',
      id: 'asset_tax',
    },
    {
      category: 'Capital Duties',
      description:
        'Capital duties are taxes on the issuance of shares of stock, typically levied at very low rates or as a small, flat fee.',
      id: 'capital_duties',
    },
    {
      category: 'Financial Transaction Tax',
      description:
        'A financial transaction tax is a levy on the sale or purchase of a financial asset.',
      id: 'financial_transaction_tax',
    },
  ];
  return (
    <div id={id}>
      <h2>{`Property Taxes in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        Property taxes apply to assets of an individual or a business. Estate
        and inheritance taxes, for example, are due upon the death of an
        individual and the passing of his or her estate to an heir,
        respectively. Taxes on real property, on the other hand, are paid at set
        intervals—often annually—on the value of taxable property such as land
        and houses.
      </p>
      <p>
        Many property taxes are highly distortive and add significant complexity
        to the life of a taxpayer or business. Estate and inheritance taxes
        create disincentives against additional work and saving, which damages
        productivity and output. Financial transaction taxes increase the cost
        of capital, which limits the flow of investment capital to its most
        efficient allocations. Taxes on wealth limit the capital available in
        the economy, which damages long-term economic growth and innovation.
      </p>
      <p>
        Sound tax policy minimizes economic distortions. With the exception of
        taxes on land, most property taxes increase economic distortions and
        have long-term negative effects on an economy and its productivity.
      </p>
      <PropTaxTable>
        <thead>
          <tr>
            <th>Property Tax Category</th>
            <th>Description</th>
            <th>Has This Tax?</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={`prop-tax-${row.id}`}>
              <td>{row.category}</td>
              <td>{row.description}</td>
              <td>{+data[row.id] === 1 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </PropTaxTable>
      <KeyFigures>
        <div>
          <h3>Share of Revenue from Property Taxes</h3>
          <div>{`${data.property_tax_share_of_revenue}%`}</div>
        </div>
        <div>
          <h3>Property Tax Revenue as a Share of Capital Stock</h3>
          <div>{`${
            Math.round(+data.property_tax_collections * 100) / 100
          }%`}</div>
        </div>
      </KeyFigures>
    </div>
  );
};

PropertyTax.propTypes = {
  countryName: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.string,
};

export default PropertyTax;
