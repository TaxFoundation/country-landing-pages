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

const PropertyTax = ({ countryName, countryArticle, data }) => {
  const rows = [
    {
      category: 'Net Wealth Tax',
      description:
        "I'm baby man bun irony chambray umami. Vaporware lumbersexual snackwave leggings paleo twee messenger bag try-hard wolf echo park subway tile helvetica street art yuccie.",
      id: 'net_wealth',
    },
    {
      category: 'Estate or Inheritance Tax',
      description:
        'Poke tbh vaporware health goth. Asymmetrical distillery venmo keytar williamsburg beard, adaptogen +1 locavore green juice enamel pin.',
      id: 'estate_or_inheritance_tax',
    },
    {
      category: 'Transfer Tax',
      description:
        'Pickled succulents shoreditch kickstarter. Scenester fixie adaptogen edison bulb DIY keffiyeh tumblr gluten-free farm-to-table knausgaard paleo distillery hot chicken.',
      id: 'transfer_tax',
    },
    {
      category: 'Asset Tax',
      description:
        'Tofu food truck edison bulb, art party raclette mustache vape tote bag etsy selvage.',
      id: 'asset_tax',
    },
    {
      category: 'Capital Duties',
      description:
        '+1 microdosing cray everyday carry la croix tbh. Enamel pin viral four loko photo booth.',
      id: 'capital_duties',
    },
    {
      category: 'Financial Transaction Tax',
      description:
        "I'm baby master cleanse chicharrones messenger bag fanny pack kale chips pickled. Jean shorts thundercats kinfolk everyday carry stumptown lomo air plant viral leggings.",
      id: 'financial_transaction_tax',
    },
  ];
  return (
    <div>
      <h2>{`Property Taxes in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        I'm baby actually asymmetrical tacos, snackwave mlkshk squid kale chips
        mumblecore. Biodiesel tote bag semiotics, single-origin coffee vice
        sartorial next level vexillologist raw denim freegan disrupt ennui
        mlkshk kinfolk. Swag seitan craft beer vexillologist, williamsburg
        taxidermy meditation fixie letterpress iPhone air plant. Hot chicken
        actually unicorn cold-pressed plaid tofu green juice. Leggings forage
        portland PBR&B cornhole, tattooed everyday carry tumeric you probably
        haven't heard of them. Four dollar toast synth wolf woke marfa drinking
        vinegar hot chicken keytar humblebrag, pitchfork fam. Franzen PBR&B
        truffaut shoreditch meggings vegan hashtag disrupt.
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
    </div>
  );
};

PropertyTax.propTypes = {
  countryName: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.object,
};

export default PropertyTax;
