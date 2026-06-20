const fs = require('fs');

const filePath = 'app/crisis-mode/index.tsx';
let data = fs.readFileSync(filePath, 'utf8');

// Extract the Svg from opacity1
const svgMatch = data.match(/<Svg width="100%".*?<\/Svg>/s);
if (!svgMatch) {
    console.error("Could not find Svg!");
    process.exit(1);
}

const baseSvg = svgMatch[0];

// Create Svg for Layar 2 (yellow)
const svg2 = baseSvg.replace(/gradienIcon/g, 'gradienIcon2')
    .replace('rgba(109, 115, 177, 0.64)', 'rgba(253, 239, 200, 0.64)')
    .replace('rgba(160, 166, 224, 0.64)', 'rgba(245, 210, 142, 0.64)')
    .replace('rgba(188, 194, 255, 0.64)', 'rgba(236, 180, 84, 0.64)');

// Create Svg for Layar 3 (blue)
const svg3 = baseSvg.replace(/gradienIcon/g, 'gradienIcon3')
    .replace('rgba(109, 115, 177, 0.64)', 'rgba(196, 213, 244, 0.64)')
    .replace('rgba(160, 166, 224, 0.64)', 'rgba(146, 176, 234, 0.64)')
    .replace('rgba(188, 194, 255, 0.64)', 'rgba(96, 140, 224, 0.64)');

// Replace opacity2 content
data = data.replace(
    /<Animated\.View style={\[StyleSheet\.absoluteFillObject, { opacity: opacity2 }\]}>\s*<LinearGradient colors={\['#FDEFC8', '#ecb454'\]} style={StyleSheet\.absoluteFillObject} \/>\s*<\/Animated\.View>/,
    `<Animated.View style={[StyleSheet.absoluteFillObject, { opacity: opacity2 }]}>
        <LinearGradient colors={['#FDEFC8', '#ecb454']} style={StyleSheet.absoluteFillObject} />
        ${svg2}
      </Animated.View>`
);

// Replace opacity3 content
data = data.replace(
    /<Animated\.View style={\[StyleSheet\.absoluteFillObject, { opacity: opacity3 }\]}>\s*<LinearGradient colors={\['#c4d5f4', '#608ce0'\]} style={StyleSheet\.absoluteFillObject} \/>\s*<\/Animated\.View>/,
    `<Animated.View style={[StyleSheet.absoluteFillObject, { opacity: opacity3 }]}>
        <LinearGradient colors={['#c4d5f4', '#608ce0']} style={StyleSheet.absoluteFillObject} />
        ${svg3}
      </Animated.View>`
);

fs.writeFileSync(filePath, data);
console.log("Done");
