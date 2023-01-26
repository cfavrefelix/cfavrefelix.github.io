import React, { FunctionComponent, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import Loader from "carbon-react/lib/components/loader";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";

import { AppContextProvider } from './context/AppContext';
import { LabelsContextProvider } from './context/Labels.context';

import { AppOptions } from './models';

import { Router } from './components/Router';
import { DefaultRoute } from './components/DefaultRoute';
import { LoadingIndicator } from './components/LoadingIndicator';
import { AppHeader } from './components/AppHeader';

import appTheme from './theme';

const ReleaseNote = React.lazy(() => import('./components/ReleaseNote'));
const Archive = React.lazy(() => import('./components/Archive'));


const AppStyles = styled.div<{ showHeader: boolean }>`
  line-height: 1.5;
  color: var(--colorsUtilityYin090);
  background: var(--colorsUtilityYang100);
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  * {
    box-sizing: inherit;
  }

  a:not(.custom){
    color: var(--colorsActionMajor500);
    &:hover{
        color: var(--colorsActionMajor600);
    }
    &:focus {
        color: var(--colorsUtilityYin090);
        background-color: var(--colorsSemanticFocus250);
        outline: none;
    }
  }

  .text-content{
    font-size: var(--body-text-size, .875rem);
    a[target="_blank"]{
      position: relative;
      margin-right: 1.3rem;
      &:after {
          position: absolute;
          font-family: CarbonIcons;
          content: "";
          text-decoration: none;
          transform: translateY(-1px);
          margin-left: .25rem;
          font-size: 1rem;
      }
    }
    p {
      margin: 0 0 1.5rem;
    }
    ul {
        list-style-type: square;
    }
    ul, ol {
        padding: 0 0 0 1.6rem;
        margin: 1.5rem 0;
    }
    li {
        margin: 0 0 1rem;
    }
    ol ol {
      list-style-type: lower-alpha;
    }
    ol ol ol {
      list-style-type: upper-alpha;
    }
    img{
        display: block;
        height: auto;
        max-width: 100%;
        margin-bottom: 1.5rem;
    }
    figure {
        margin: 1.5rem 0;
        img {
            margin-bottom: .5rem;
        }
    }
    figcaption {
        font-style: italic;
    }
  }

  [data-component="link"] {
    a, button {
      font-size: var(--body-text-size, inherit);
    }
  }


  [data-component="pill"] {
    background-clip: padding-box;
  }

  // CSS variables:
  --header-height: ${({ showHeader }) => showHeader ? '3rem' : '0'};
  --body-text-size: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tabletLandscape.min}){
    --body-text-size: .875rem;
  }
`;

export const App: FunctionComponent<{ options: AppOptions }> = ({ options }) => {
  return <CarbonProvider theme={appTheme}>
    <AppStyles showHeader={Boolean(options.showHeader)}>
      <Router router={options.routingStrategy}>
        <AppContextProvider options={options}>
          <LabelsContextProvider>
            <AppHeader />
            <Switch>
              <Route path="/release/:language/:version">
                <Suspense fallback={<Loader size="small" />}>
                  <ReleaseNote />
                </Suspense>
              </Route>
              <Route path="/archive/:language">
                <Suspense fallback={<Loader size="small" />}>
                  <Archive />
                </Suspense>
              </Route>
              <Route>
                <DefaultRoute />
              </Route>
            </Switch>
            <LoadingIndicator />
          </LabelsContextProvider>
        </AppContextProvider>
      </Router>
    </AppStyles>
  </CarbonProvider>
};