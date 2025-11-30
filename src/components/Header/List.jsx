function List({ list }){

    const isPastDate = (dateString) => {
        const today = new Date();
        const taskDate = new Date(dateString);
        today.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate < today;
    };

    return (
        <ul>
            {list?.filter(i => i?.text).map(i => (
                <li
                    key={i.id}
                    style={{
                        textDecoration: isPastDate(i.date) ? "line-through" : "none",
                        textDecorationColor: isPastDate(i.date) ? "red" : "inherit",
                        textDecorationThickness: isPastDate(i.date) ? "2px" : "auto",
                        opacity: isPastDate(i.date) ? 0.7 : 1,
                    }}
                >
                    <strong>{i.text}</strong> - <em>{i.date}</em>
                </li>
            ))}
        </ul>
    )
}

export default List;