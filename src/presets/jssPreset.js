import jssGlobal from 'jss-global';
import jssNested from 'jss-nested';
import jssCompose from 'jss-compose';
import jssCamelCase from 'jss-camel-case';
import jssDefaultUnit from 'jss-default-unit';
import jssVendorPrefixer from 'jss-vendor-prefixer';
import jssPropsSort from 'jss-props-sort';

// Subset of jss-preset-default with only the plugins the Storyline-UI
// components are using.
function jssPreset() {
  return {
    plugins: [
      jssGlobal(),
      jssNested(),
      jssCamelCase(),
      jssDefaultUnit(),
      jssVendorPrefixer(),
      jssPropsSort(),
      jssCompose()
    ]
  };
}

export default jssPreset;
