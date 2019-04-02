import React from 'react';
import { View, Text, Image } from 'react-native';
import sb from 'react-native-style-block';
import config from '../../../../config/project.config';
import str2int from 'str2int';

class TAvatar extends React.Component {
  static defaultProps = {
    uri: '',
    name: '',
    style: [],
    capitalSize: 20,
    height: 100,
    width: 100,
  };

  constructor(props) {
    super(props);
    this.state = {
      loadError: false,
    };
  }

  getColor(name) {
    if (!name) {
      return '#ffffff'; // 如果获取不到名字，则返回白色
    }

    const color = config.defaultImg.color;
    const id = str2int(name);
    return color[id % color.length];
  }

  render() {
    let { uri, name, style, capitalSize, height, width } = this.props;

    if (!style instanceof Array) {
      style = [style];
    }

    let capital = name[0];
    if (capital) {
      capital = capital.toUpperCase();
    }
    let color = this.getColor(name);

    if (uri && !this.state.loadError) {
      if (typeof uri === 'string') {
        uri = { uri };
      }
      return (
        <Image
          style={[...style, { height, width }]}
          source={uri}
          onError={() => this.setState({ loadError: true })}
        />
      );
    } else {
      return (
        <View
          style={[
            ...style,
            { backgroundColor: color, height, width },
            sb.center(),
          ]}
        >
          <Text style={[...styles.capital, { fontSize: capitalSize }]}>
            {capital}
          </Text>
        </View>
      );
    }
  }
}

const styles = {
  capital: [
    {
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    sb.color(),
  ],
};

export default TAvatar;
