import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

export default () => (
  <Layout>
    <h1>This app rules</h1>
    <p>login to see why</p>
    <Link to="/dashboard">Go to dashboard</Link>
  </Layout>
);