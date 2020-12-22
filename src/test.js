const get_numerical_derivate = (y_n, y_n_1, x_n, x_n_1) => (y_n - y_n_1) / (x_n - x_n_1);
const dot_product = (vect_1, vect_2) => vect_1
  .reduce(
    (total, val, index) => total + val * vect_2[index],
    0,
  );
const scalar_product = (vect = [], scalar = 1) => vect.map(val => val * scalar);
const norm_of_vector = vect => Math.sqrt(dot_product(vect, vect));
const add_lists = (list1, list2) => list1.reduce(
  (added, val, index) => added.concat([val + list2[index]]),
  [],
);
let gd = (
  point_0,
  get_error,
  STEP_SIZE = 0.3,
  DELTA_SIZE = STEP_SIZE.DELTA_SIZE || 1,
  NUM_STEPS = STEP_SIZE.NUM_STEPS || 15,
  PRECISION = STEP_SIZE.PRECISION || STEP_SIZE.STEP_SIZE || STEP_SIZE || 1,
  TOLERANCE = STEP_SIZE.TOLERANCE,
  ADAPTIVE = (STEP_SIZE.ADAPTIVE !== undefined ? STEP_SIZE.ADAPTIVE : false)
) => {
  STEP_SIZE = STEP_SIZE.STEP_SIZE || STEP_SIZE;
  let x_n_minus_1 = Object.assign([], point_0);
  const space_dim = x_n_minus_1.length;
  let Error_n_minus_1 = get_error(...x_n_minus_1);
  let x_n = Object.assign([], x_n_minus_1);
  for (let j = 0; j < NUM_STEPS; j++) {
    const derivate = [];
    for (let index = 0; index < space_dim; index++) {
      if (ADAPTIVE) {
        step = (Math.random() || 1) * (ADAPTIVE*DELTA_SIZE/(j+ADAPTIVE))
      } else {
        step = (Math.random() || 1) * (DELTA_SIZE)
      }
      x_n[index] += step;
      const Error_n = get_error(...x_n);
      const numerical_derivate = get_numerical_derivate(
        Error_n,
        Error_n_minus_1,
        x_n[index],
        x_n_minus_1[index],
      );
      derivate.push(numerical_derivate);
      x_n[index] -= step;
    }

    const normOfDerivate = norm_of_vector(derivate);

    if (normOfDerivate < PRECISION) {
        //console.log(`PRECISION finished early with ${j+1} iters`);
        break;
    }

    let stepInDerivateDirection;
    if (ADAPTIVE) {
        stepInDerivateDirection = scalar_product(derivate, -1 * (ADAPTIVE*STEP_SIZE/(j+ADAPTIVE)));
    } else {
        stepInDerivateDirection = scalar_product(derivate, -1 * STEP_SIZE);
    }

    x_n_minus_1 = add_lists(x_n, stepInDerivateDirection);
    Error_n_minus_1 = get_error(...x_n_minus_1);
    x_n = Object.assign([], x_n_minus_1);
    if (Error_n_minus_1 < TOLERANCE) {
        //console.log(`TOLERANCE finished early with ${j+1} iters`);
        break;
    }
  }
  return x_n;
};



const mj = require("mathjs");
window.mj = mj;

function go() {
    const func = (x, y, z) => x * x + y * y + z * z;
    const init = [3, 4, 5]; // dimension is obtained from initial point
    let res = gd(init, func, {STEP_SIZE:1, NUM_STEPS:1000, DELTA_SIZE:0.1, PRECISION:0.0001, ADAPTIVE:10});
    console.log(`had ${init} -> ${func(...init)} , now ${res} -> ${func(...res)}`);
}

//go();

window.asdf = function(A = 1, B = A*2) {
    console.log(`A ${A} , B ${B}`);
}

function armMtx(a,b,c) {
    let MA = 0.39;
    let MB = 0.217;
    let MC = 0.294;
    let A = (c-MC)*2*Math.PI;
    let B = (b-MB)*2*Math.PI;
    let G = B+(a-MA)*2*Math.PI;
    let Q = Math.sqrt(30);
    let L = 80;
    let M4 = function() {
        return new THREE.Matrix4();
    }
    let M = M4()
        .makeTranslation(80,0,0)
        .premultiply(M4().makeRotationZ(G))
        .premultiply(M4().makeTranslation(0,L,0))
        .premultiply(M4().makeRotationZ(-B))
        .premultiply(M4().makeTranslation(Q,Q,0))
        .premultiply(M4().makeRotationY(A));
    return M;
}

armMtx(10,10,10);
window.armMtx = armMtx;

function seek([tx,ty,tz],init=[0.34,0.217,0.294]) {
    const func = (a, b, g) => {
        let result = new THREE.Vector3(0,0,0).applyMatrix4(armMtx(a,b,g));
        return Math.sqrt((result.x-tx)**2 + (result.y-ty)**2 + (result.z-tz)**2);
    };

    let result = gd(init, func, {STEP_SIZE:0.0001, NUM_STEPS:400, DELTA_SIZE:0.00001, PRECISION:1, TOLERANCE:1, ADAPTIVE:1});

    // let result = MP(
    //     func,
    //     init,
    //     {bounds: [[-Math.PI/2, Math.PI/2], [-Math.PI/2, Math.PI/2], [-Math.PI/2, Math.PI/2]]}
    // );

    //console.log(result, new THREE.Vector3(0,0,0).applyMatrix4(armMtx(...result)), func(...result));
    return result;
}

seek([85.47722557505166,85.47722557505166,0]);
window.seek = seek;