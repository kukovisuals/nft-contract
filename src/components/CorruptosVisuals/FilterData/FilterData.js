
export const FilterData = (d) => {
	let {...obj} = d

	obj['ABUSO DE CONTRATACIÓN DIRECTA'] = +d['ABUSO DE CONTRATACIÓN DIRECTA']
	.split('.').join('')

	obj['FAVORECIMIENTO DE INTERESES POLÍTICOS'] = +d['FAVORECIMIENTO DE INTERESES POLÍTICOS']
	.split('.').join('')

	obj['SOBRECOSTOS EN BIENES Y SERVICIOS DIFERENTES A ALIMENTOS'] = +d['SOBRECOSTOS EN BIENES Y SERVICIOS DIFERENTES A ALIMENTOS']
	.split('.').join('')

	obj['SOBRECOSTOS EN MERCADOS'] = +d['SOBRECOSTOS EN MERCADOS']
	.split('.').join('')

	obj['TOTAL POR DEPARTAMENTO'] = +d['TOTAL POR DEPARTAMENTO']
	.split('.').join('')

	return obj
}

