import RulesHeader from './RulesHeader';
import Rule from './Rule';

export default function Rules({rules}) {

    return (
        <div>
            <RulesHeader />
            {rules && rules.map((rule, i) => {
                const { number, description } = rule;
                return (
                    <Rule key={i} number={number} description={description} />
                )
            })}
        </div>
    )
}