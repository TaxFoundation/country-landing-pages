import { useEffect } from 'react';
import * as pym from '../static/pym.js';

function usePym() {
  function initiatePym() {
    const pymChild = new pym.Child({
      polling: 25,
    });
    pymChild.sendHeight();
  }

  useEffect(() => {
    if (typeof window === undefined) {
      return false;
    }

    window.addEventListener('load', initiatePym);

    return window.removeEventListener('load', initiatePym);
  }, []);
}

export default usePym;
