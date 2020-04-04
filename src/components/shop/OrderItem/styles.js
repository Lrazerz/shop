import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  date: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});
