import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Wrapper from './ui/Wrapper';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import ReportsAndData from './ui/ReportsAndData';

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

const PropertyTax = ({ data }) => {
  const country = { ...data.countriesCsv };
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.edges.map(edge => +edge.node.year)
  );
  const theData = {
    net_wealth: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.net_wealth,
    estate_or_inheritance_tax: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.estate_or_inheritance_tax,
    transfer_tax: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.transfer_tax,
    asset_tax: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.asset_tax,
    capital_duties: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.capital_duties,
    financial_transaction_tax: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.financial_transaction_tax,
    property_tax_collections: data.allIndexRawDataCsv.edges.find(
      edge => +edge.node.year === itciMaxYear
    ).node.property_tax_collections,
    property_tax_share_of_revenue:
      data.allSourceRevenueByCountryCsv.edges[0].node.Property_Taxes,
  };
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
    <Wrapper>
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
              <td>{+theData[row.id] === 1 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </PropTaxTable>
      <ReportsAndData
        report='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
        data='https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs'
      />
      <KeyFigures>
        <KeyFigure>
          <h3>Share of Revenue from Property Taxes</h3>
          <div>{`${theData.property_tax_share_of_revenue}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Property Tax Revenue as a Share of Capital Stock</h3>
          <div>{`${
            Math.round(+theData.property_tax_collections * 100) / 100
          }%`}</div>
        </KeyFigure>
      </KeyFigures>
    </Wrapper>
  );
};

export const query = graphql`
  query($iso3: String!) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
      adjective
      article
    }
    allIndexRawDataCsv(filter: { ISO_3: { eq: $iso3 } }) {
      edges {
        node {
          ISO_3
          year
          net_wealth
          estate_or_inheritance_tax
          transfer_tax
          asset_tax
          capital_duties
          property_tax_collections
          financial_transaction_tax
        }
      }
    }
    allSourceRevenueByCountryCsv(filter: { iso_3: { eq: $iso3 } }) {
      edges {
        node {
          Property_Taxes
        }
      }
    }
  }
`;

PropertyTax.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PropertyTax;
