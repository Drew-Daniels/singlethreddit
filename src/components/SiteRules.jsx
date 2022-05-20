import Rules from './Rules';
import Rule from '../factories/Rule';

export default function SiteRules(props) {

    const rules = [
        Rule(1, 'Remember the human'),
        Rule(2, 'Behave like you would in real life'),
        Rule(3, 'Look for the original source of the content'),
        Rule(4, 'Search for duplicates before posting'),
        Rule(5, "Read the community's rules"),
    ]

    return (
        <Rules rules={rules} />
    )
}