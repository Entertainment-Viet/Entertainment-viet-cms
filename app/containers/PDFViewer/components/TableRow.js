import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  val1: {
    width: '50%',
    border: '1px solid black',
    textAlign: 'center',
  },
  val2: {
    width: '50%',
    border: '1px solid black',
    textAlign: 'center',
  },
  val3: {
    width: '20%',
    border: '1px solid black',
    textAlign: 'center',
  },
  val4: {
    width: '20%',
    border: '1px solid black',
    textAlign: 'center',
  },
  val5: {
    width: '20%',
    border: '1px solid black',
    textAlign: 'center',
  },
  row1: {
    width: '50%',
    textAlign: 'center',
  },
  row2: {
    width: '50%',
    textAlign: 'center',
  },
  row3: {
    width: '20%',
    textAlign: 'center',
  },
  row4: {
    width: '20%',
    textAlign: 'center',
  },
  row5: {
    width: '20%',
    textAlign: 'center',
  },
});

const TableRow = ({ items, titles }) => {
  console.log('item: ', items)
  const title = (
    <View style={styles.row}>
      <Text style={styles.row1}>{titles[0]}</Text>
      <Text style={styles.row2}>{titles[1]}</Text>
    </View>
  );
  const rows = items.map(item => (
    <View style={styles.row} key={item.bookingCode}>
      <Text style={styles.val1}>{item.bookingCode}</Text>
      <Text style={styles.val2}>{item.organizerName}</Text>
    </View>
  ));
  return (
    <Fragment>
      {title}
      {rows}
    </Fragment>
  );
};

export default TableRow;
