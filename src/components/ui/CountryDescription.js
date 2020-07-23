import React from 'react';
import PropTypes from 'prop-types';

const CountryDescription = ({ country }) => {
  return (
    <div>
      <h1>{`Taxes in ${country.article ? 'the ' : ''}${country.name}`}</h1>
      <p>
        I&apos;m baby next level migas cray, chia cold-pressed leggings ethical
        90&apos;s. Marfa selvage brooklyn raclette, edison bulb live-edge squid.
        VHS tilde kickstarter ramps, disrupt hashtag af master cleanse freegan
        fingerstache adaptogen echo park next level listicle. Snackwave schlitz
        heirloom subway tile kickstarter, blog neutra pug sustainable.
      </p>
      <p>
        Microdosing mustache actually farm-to-table literally thundercats
        bitters chicharrones food truck cold-pressed keffiyeh. Ennui four loko
        leggings street art. Swag authentic tote bag kale chips photo booth.
        Offal 3 wolf moon mlkshk thundercats etsy irony forage cray subway tile
        craft beer four loko bushwick. Bushwick pok pok disrupt, cliche meggings
        single-origin coffee swag messenger bag brooklyn hell of chillwave.
        Franzen church-key single-origin coffee cold-pressed selvage, meggings
        shabby chic activated charcoal vegan schlitz tilde pabst biodiesel.
      </p>
    </div>
  );
};

CountryDescription.propTypes = {
  country: PropTypes.object,
};

export default CountryDescription;
